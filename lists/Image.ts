import { File } from '@keystonejs/fields';


export default (keystone, { imageFileAdapter }) => {
	console.log('Image');

	keystone.createList('Image', {
		schemaDoc: 'Image for Article',
		labelResolver: item => item.file.originalFilename,

		fields: {
			file: { type: File, adapter: imageFileAdapter }


		}

	});
}