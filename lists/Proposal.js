const { Text, Select } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
const sanitizeHTML = require('sanitize-html');
const mongoose = require('mongoose');

module.exports = (keystone) => {
	console.log('Proposal');

	keystone.createList('Proposal', {
		schemaDoc: 'Proposed Content',
		labelField: 'title',

		fields: {
			title: { type: Text, schemaDoc: 'Title for submitted article' },
			text: { type: Wysiwyg },

			status: { type: Select, options: ['Pending', 'Approved'], defaultValue: 'Pending' }

		},
		hooks: {
			// Hooks for create and update operations
			resolveInput: async (params) => {
				const resolvedData = params.resolvedData;
				const existingItem = params.existingItem;
				if (existingItem && resolvedData && resolvedData.status && resolvedData.status.toLowerCase() === 'approved') {
					const articlesAdapter = keystone.lists.Article.adapter;
					const id = mongoose.Types.ObjectId(existingItem.id);
					const existing = await articlesAdapter.findOne({ proposal: id });
					const cleanText = sanitizeHTML(existingItem.text);
					const cleanTitle = sanitizeHTML(existingItem.title);
					if (!existing)

						await articlesAdapter.create({
							title: cleanTitle,
							text: cleanText,
							status: 'Hidden',
							proposal: id
						});
				}
				return params.resolvedData;
			}
		}
	});

};