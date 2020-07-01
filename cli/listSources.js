const chalk = require("chalk")
const Table = require("cli-table")
const providers = require("../providers")

function listAllSources(selectedSource) {
  const table = new Table({
    head: ["Source", "Source ID", "Available types"]
  })

  const sources = selectedSource
    ? providers.filter((provider) => provider.id === selectedSource)
    : providers

  sources.forEach((source) => {
    const types = Object.values(source.types)
      .sort()
      .reduce((acc, curr) => {
        const isDefault = curr === source.defaultFetchType
        return `${acc}${acc ? "\n" : ""}${curr}${
          isDefault ? chalk.grey(" (default)") : ""
        }`
      }, "")

    table.push([source.name, source.id, types])
  })

  console.log(table.toString())
}

module.exports = {
  listAllSources
}