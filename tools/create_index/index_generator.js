var fs = require('fs')

// We will fill in this object with our data
var vuln = {}

const createIndex = function (vulnDirectoryPath, writeDirectoryPath, filename) {
  const files = fs.readdirSync(vulnDirectoryPath)
  getVulnDirectoryContents(files, vulnDirectoryPath)
  writeIndex(vuln, writeDirectoryPath, filename)
}


const getVulnDirectoryContents = function (entries, vulnDir) {
  // if the first entry's value contains `'.json'` we can assume that all entries are files. Otherwise they're directories.
  const entriesAreFiles = entries[0].includes('.json')
  
  if (entriesAreFiles === true) {
    console.log(`Files detected. Reading their contents and writing them to ${vulnDir} as directed.`)
    for(entry of entries) {
      const filename = entry.slice(-0, entry.toString().indexOf('.json'))
      
      const data = fs.readFileSync(vulnDir + entry)
      
      createVulnObject(filename, data)
    }
  } else if (entriesAreFiles === false) {
    console.log(`Directories rather than files detected. Reading directory contents and writing them to ${vulnDir} as directed.`)
    for(var entry in entries){
      const subDirectoryFiles = fs.readdirSync(vulnDir + entries[entry])

      for(file of subDirectoryFiles) {

        const filename = file.slice(-0, file.toString().indexOf('.json'))
        
        const data = fs.readFileSync(`${vulnDir}${entries[entry]}/${file}`)
        createVulnObject(filename, data)
      }
    }
  }
}

const createVulnObject = function(identifier, json) {
  vuln[identifier] = JSON.parse(json)
}

const writeIndex = function(data, writeDir, filename) {
  fs.writeFileSync(writeDir + filename + '.json', JSON.stringify(data, null, 2) + '\n')
}

module.exports = createIndex
