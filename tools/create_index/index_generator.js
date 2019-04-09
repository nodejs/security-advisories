var fs = require('fs')

// We will fill in this object with our data
var vuln = {}

const createIndex = function (vulnDirectoryPath, writeDirectoryPath, filename) {
  const files = fs.readdirSync(vulnDirectoryPath)
  getVulnDirectoryContents(files, vulnDirectoryPath)
  writeIndex(vuln, writeDirectoryPath, filename)
}


const getVulnDirectoryContents = function (entries, vulnDir) {
  // if the first entry's value is `undefined` we can assume that the entries are actually directories. Otherwise they're files.

// TODO: 
// this all currently works, with the caveat of the conditional line below always returning false.
// Need to change it to detect if `.json` is at the end of the line and detect the difference that way.

  const entriesAreFiles = entries[0].includes('.json')
  
  if(entriesAreFiles === true) {
    for(entry of entries) {
      const filename = entry.slice(-0, entry.toString().indexOf('.json'))
      
      const data = fs.readFileSync(vulnDir + entry)
      
      createVulnObject(filename, data)
    }
  } else if (entriesAreFiles === false) {
    for(var entry in entries){
      const subDirectoryFiles = fs.readdirSync(vulnDir + entries[entry])

      for(file in subDirectoryFiles) {
        const filename = file.slice(-0, file.toString().indexOf('.json'))
        
        const data = fs.readFileSync(`${vulnDir}${entries[entry]}/${subDirectoryFiles[file]}`)
        
        createVulnObject(filename, data)
      }
    }
  }
}

const createVulnObject = function(identifier, json) {
  vuln[identifier] = JSON.parse(json)
}

const writeIndex = function(data, writeDir, filename) {
  fs.writeFileSync(writeDir + filename + '.json', JSON.stringify(data))
  
  if(writeDir === './vuln/core/') {
    console.log('Succesfully wrote ' + writeDir + 'index.json for core vulnerabilities.')
  } else if(writeDir === './vuln/npm/') {
    console.log('Succesfully wrote ' + writeDir + 'index.json for npm vulnerabilities.')
  }
}

module.exports = createIndex
