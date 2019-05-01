var fs = require('fs')

// We will fill this object by iterating over a directory, and adding the contents file in that directory to it (as identified by the file's name)
var vuln = {}

// Main function that we export. Takes a path to read from (vulnDirectoryPath), a path to write to (writeDirectoryPath), and the name of the index file to write (filename)
const createIndex = function (vulnDirectoryPath, writeDirectoryPath, filename) {
  const files = fs.readdirSync(vulnDirectoryPath) // Read the path that is passed into this function when invoked

  getVulnDirectoryContents(files, vulnDirectoryPath)
  writeIndex(vuln, writeDirectoryPath, filename)
}

// Do the work of reading directories + subdirectories.
const getVulnDirectoryContents = function (entries, vulnDir) {
  // if the first entry's value contains `'.json'` we can assume that all entries are files. Otherwise they're directories.
  const entriesAreFiles = entries[0].includes('.json')
  
  if (entriesAreFiles === true) { // If the entries in the directory we're looking at are files, we can go ahead and parse them as files immediately.
    console.log(`Files detected. Reading their contents and writing them to ${vulnDir} as directed.`)

    for(entry of entries) { // Loop over each file, getting the filename and reading the contents and passing that information to createVulnObject()
      const filename = entry.slice(-0, entry.toString().indexOf('.json'))

      const data = fs.readFileSync(vulnDir + entry)

      createVulnObject(filename, data)
    }
  } else if (entriesAreFiles === false) { // If the entries in the directory we're looking at are themselves directories, we need to go deeper and read the contents of each directory
    console.log(`Directories rather than files detected. Reading directory contents and writing them to ${vulnDir} as directed.`)

    for(var subdirectory in entries){ // Loop over all the directories in the directory that was passed to the function.
      const subDirectoryFiles = fs.readdirSync(vulnDir + entries[subdirectory])

      for(file of subDirectoryFiles) { // Now loop over each file, getting the filename and reading the contents and passing that information to createVulnObject()

        const filename = file.slice(-0, file.toString().indexOf('.json'))

        const data = fs.readFileSync(`${vulnDir}${entries[subdirectory]}/${file}`)
        createVulnObject(filename, data)
      }
    }
  }
}

// Function that we can call inside of a loop to build out our `vuln` object. Intentionally simple, mostly written for ease of use and clarity.
const createVulnObject = function(identifier, json) {
  vuln[identifier] = JSON.parse(json)
}

// Function that we can use to write the JSON object out once we're done building it, given that we know where we want to write it and what we want to name it.
const writeIndex = function(data, writeDir, filename) {
  fs.writeFileSync(writeDir + filename + '.json', JSON.stringify(data, null, 2) + '\n')
}

module.exports = createIndex
