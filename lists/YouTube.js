const { OEmbed }= require('@keystonejs/fields');


module.exports = (keystone,{iframelyAdapter}) => {
	console.log('YouTube');

	keystone.createList('YouTube', {
		schemaDoc: 'YouTube embeds',
		labelResolver: item => {
			console.log(item);
			return item.youtube.title;
		},

		fields: {
			youtube: { type: OEmbed, adapter: iframelyAdapter }
		}

	});

};