const { OEmbed }= require('@keystonejs/fields');


module.exports = (keystone, {iframelyAdapter}) => {
	console.log('Podcast');

	keystone.createList('Podcast', {
		schemaDoc: 'Podcast embeds',
		labelResolver: item => {
			return item.spotify.title;
		},

		fields: {
			spotify: { type: OEmbed, adapter: iframelyAdapter }
		}

	});

}