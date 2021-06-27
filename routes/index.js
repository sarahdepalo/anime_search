'use strict';

const express = require('express');
const router = express.Router();

const { getAnime } = require('../models/animeModel');

router.get('/', getAnime).post('/', getAnime);

module.exports = router;