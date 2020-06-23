const sanityClient = require('@sanity/client')

const client = sanityClient({
	projectId: 'nefoi77a',
	dataset: 'production',
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
})

exports.handler = async (event) => {

	const { corgiId, nameKey } = JSON.parse(event.body);

	const corgi = await client.patch(corgiId).inc({
		[`suggestedNames[_key=="${nameKey}"].votes`]: 1,
	}).commit();

	const newVotes = corgi.suggestedNames.find((n) => n._key === nameKey).votes;

	return {
		statusCode: 200,
		body: JSON.stringify({
			totalVotes: newVotes
		})
	}
}
