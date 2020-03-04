import { Checkbox, Password, Text } from '@keystonejs/fields';


export default keystone => {
	console.log('User');

	keystone.createList('User', {
		labelField: 'username',

		access: {
			// 1. Only admins can read deactivated user accounts
			read: ({ authentication: { item } }) => {
				/* console.log('list access User')
				 console.log(item)*/
				if (item.isAdmin) {
					return {}; // Don't filter any items for admins
				}
				// Approximately; users.filter(user => user.state !== 'deactivated');
				return {
					state_not: 'deactivated'
				};
			}
		}, fields: {
			username: { type: Text },
			password: {
				type: Password,
				access: {
					// 3. Only admins can see if a password is set. No-one can read their own or other user's passwords.
					read: ({ authentication }) => {
						/*      console.log('field access User password READ')

									console.log(authentication)*/
						return authentication.item.isAdmin;
					},
					// 4. Only authenticated users can update their own password. Admins can update anyone's password.
					update: ({ existingItem, authentication }) => {
						/*     console.log('field access User password UPDATE')

								 console.log(existingItem, authentication)*/
						return authentication.item.isAdmin
							|| existingItem.id === authentication.item.id;
					}
				}
			},
			isAdmin: {
				type: Checkbox
			}
			/* read: ({authentication}) => {

								 console.log('field access User isAdmin READ')

				console.log(authentication.item.isAdmin)
					 return authentication.item.isAdmin},
			 update: ({authentication}) => {

					 console.log('field access User isAdmin UPDATE')

					 console.log(authentication.item.isAdmin)
					 return authentication.item.isAdmin},        }
	}*/
		}
	});
}