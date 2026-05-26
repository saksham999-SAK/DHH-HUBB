const fs = require('fs');
const content = fs.readFileSync('./legacy_site/script.js', 'utf-8');

// Find the start of the users array
const startIdx = content.indexOf('let users = [');
if (startIdx !== -1) {
    let bracketCount = 0;
    let endIdx = -1;
    for (let i = startIdx + 'let users = '.length; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        if (content[i] === ']') {
            bracketCount--;
            if (bracketCount === 0) {
                endIdx = i + 1;
                break;
            }
        }
    }
    
    if (endIdx !== -1) {
        let usersStr = content.substring(startIdx, endIdx);
        usersStr = usersStr.replace('let users = ', 'export const SEARCH_USERS = ');
        fs.writeFileSync('./src/data/searchUsers.js', usersStr + ';\n');
        console.log('Successfully extracted SEARCH_USERS to searchUsers.js');
    } else {
        console.log('Could not find the end of the users array.');
    }
} else {
    console.log('Could not find users array in script.js');
}
