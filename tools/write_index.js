const generator = require('./create_index/index_generator')

const writePath = './index/' // what directory to write to

const coreVulnerabilitiesPath = './core/' // directory to read from
const coreIndexFilename = "core" // name of the file that we'll write, minus `.json`

generator(coreVulnerabilitiesPath, writePath, coreIndexFilename)

const ecosystemVulnerabilitiesPath = './ecosystem/' // directory to read from
const ecosystemIndexFilename = "ecosystem" // name of the file that we'll write, minus `.json`

generator(ecosystemVulnerabilitiesPath, writePath, ecosystemIndexFilename)