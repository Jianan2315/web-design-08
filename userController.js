const User = require('./userModel');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Create User
exports.createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate input
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: 'All fields are required.',
                input: {useremail:email || "empty",username:fullName || "empty",userpwd:password || "empty"},
                failure: true});
        }

        // Example password validation
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Create a new user
        const user = new User({ fullName, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Ensure email is provided (email is used to find the user)
        if (!email) {
            return res.status(400).json({ message: 'Email is required for updating user.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update fields
        if (fullName) user.fullName = fullName;
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        // Ensure email is provided
        if (!email) {
            return res.status(400).json({ message: 'Email is required for deleting user.' });
        }

        // Delete user
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        // Retrieve all users (excluding sensitive data like passwords)
        const users = await User.find({}, { password: 0 }); // Excludes passwords from results
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Upload Image
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Please upload a valid image file.' });
        }

        // Example: Saving file path to a user (assuming the email is provided)
        const { email } = req.body;
        if (!email) {
            // If no email is provided, you could delete the uploaded file to avoid orphaned files
            fs.unlink(path.join(__dirname, '../images', req.file.filename), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.status(400).json({ message: 'Email is required to associate an image.' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Delete uploaded image if user is not found
            fs.unlink(path.join(__dirname, '../images', req.file.filename), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
            return res.status(404).json({ message: 'User not found.' });
        }

        // Save image path to user and update
        user.imagePath = req.file.path;
        await user.save();

        res.status(200).json({ message: 'Image uploaded successfully', filePath: req.file.path });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
