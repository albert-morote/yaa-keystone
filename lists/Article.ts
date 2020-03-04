import { Relationship, Select, Text } from '@keystonejs/fields';
import { Wysiwyg } from '@keystonejs/fields-wysiwyg-tinymce';

import emptyObj from '../util/emptyObject';

export default (keystone) => {
	console.log('Article');
	keystone.createList('Article', {
		schemaDoc: 'Published Articles',
		labelField: 'title',
		access: {

			create: ({ authentication }) => (!emptyObj(authentication) && authentication.item && authentication.item.isAdmin),
			update: ({ authentication }) => !emptyObj(authentication) && authentication.item && authentication.item.isAdmin,
			delete: ({ authentication }) => !emptyObj(authentication) && authentication.item && authentication.item.isAdmin
		},
		fields: {
			title: { type: Text, schemaDoc: 'Title for published article' },
			status: { type: Select, options: 'Visible,Hidden', defaultValue: 'Hidden' },
			language: { type: Select, options: ['English', 'Francais', 'Deutsch'], defaultValue: 'English' },
			translations: { type: Relationship, ref: 'Article', many: true },
			text: { type: Wysiwyg },

			images: { type: Relationship, ref: 'Image', many: true },
			video: { type: Relationship, ref: 'YouTube', many: true },
			podcast: { type: Relationship, ref: 'Podcast', many: true },
			proposal: {
				isUnique: false,
				type: Relationship,
				ref: 'Proposal',
				access: {
					create: true,
					read: false,
					update: false
				}
			}
		}

	});
}