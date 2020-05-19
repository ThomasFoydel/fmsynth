const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

const User = require('../models/user');

router.get('/load', auth, async (req, res) => {});

router.post('/save', auth, async (req, res) => {});

module.exports = router;
