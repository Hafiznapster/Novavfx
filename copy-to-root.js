const fs = require('fs-extra');
const path = require('path');

// Copy the out directory to the root
async function copyOutToRoot() {
  try {
    // Copy index.html to root
    await fs.copy(path.join(__dirname, 'out', 'index.html'), path.join(__dirname, 'index.html'));
    
    // Copy _next directory to root
    await fs.copy(path.join(__dirname, 'out', '_next'), path.join(__dirname, '_next'));
    
    // Copy any other assets
    const files = await fs.readdir(path.join(__dirname, 'out'));
    for (const file of files) {
      if (file !== 'index.html' && file !== '_next') {
        await fs.copy(path.join(__dirname, 'out', file), path.join(__dirname, file));
      }
    }
    
    console.log('Successfully copied out directory to root!');
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

copyOutToRoot();
