module.exports = tags => tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag != '') : []
