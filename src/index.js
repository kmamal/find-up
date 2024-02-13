const Path = require('path')
const { exists, existsSync } = require('@kmamal/exists')

const findUp = async (file, options = {}) => {
	if (!file) { return null }

	const { cwd } = options
	const startDir = cwd ? Path.resolve(cwd) : process.cwd()

	let dir = startDir
	for (;;) {
		const path = Path.join(dir, file)
		if (await exists(path)) { return path }
		const nextDir = Path.dirname(dir)
		if (nextDir === dir) { break }
		dir = nextDir
	}

	return null
}

const findUpSync = (file, options = {}) => {
	if (!file) { return null }

	const { cwd } = options
	const startDir = cwd ? Path.resolve(cwd) : process.cwd()

	let dir = startDir
	for (;;) {
		const path = Path.join(dir, file)
		if (existsSync(path)) { return path }
		const nextDir = Path.dirname(dir)
		if (nextDir === dir) { break }
		dir = nextDir
	}

	return null
}

module.exports = {
	findUp,
	findUpSync,
}
