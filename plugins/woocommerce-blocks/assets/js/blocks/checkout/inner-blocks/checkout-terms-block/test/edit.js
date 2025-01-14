/**
 * External dependencies
 */
import { render, queryByText } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Edit } from '../edit';

jest.mock( '@wordpress/data', () => ( {
	...jest.requireActual( '@wordpress/data' ),
	useSelect: jest.fn().mockImplementation( ( fn ) => {
		const select = () => {
			return {
				getSelectionStart: () => ( {
					clientId: null,
				} ),
				getSelectionEnd: () => ( {
					clientId: null,
				} ),
				getFormatTypes: () => [],
			};
		};

		if ( typeof fn === 'function' ) {
			return fn( select );
		}

		return {
			isCaretWithinFormattedText: () => false,
		};
	} ),
} ) );

jest.mock( '@wordpress/block-editor', () => ( {
	...jest.requireActual( '@wordpress/block-editor' ),
	useBlockProps: jest.fn(),
	InspectorControls: jest.fn( ( { children } ) => <div>{ children }</div> ),
} ) );

jest.mock( '@poocommerce/block-settings', () => ( {
	...jest.requireActual( '@poocommerce/block-settings' ),
	PRIVACY_URL: '/privacy-policy',
	TERMS_URL: '/terms-and-conditions',
} ) );

const blockSettingsMock = jest.requireMock( '@poocommerce/block-settings' );

describe( 'Edit', () => {
	it( 'Renders a checkbox if the checkbox attribute is true', async () => {
		const { container } = render(
			<Edit
				attributes={ {
					text: 'I agree to the terms and conditions',
					checkbox: true,
				} }
				setAttributes={ () => void 0 }
			/>
		);

		expect(
			queryByText( container, 'I agree to the terms and conditions' )
		).toBeTruthy();
	} );

	it( 'Renders a notice if either the terms and conditions or privacy url attribute are unset', async () => {
		blockSettingsMock.PRIVACY_URL = '';
		blockSettingsMock.TERMS_URL = '';
		const { container } = render(
			<Edit
				attributes={ {
					text: 'I agree to the terms and conditions',
					checkbox: true,
				} }
				setAttributes={ () => void 0 }
			/>
		);

		expect(
			queryByText( container, 'Setup a Terms and Conditions page' )
		).toBeInTheDocument();

		expect(
			queryByText( container, 'Setup a Privacy Policy page' )
		).toBeInTheDocument();

		expect(
			queryByText(
				container,
				"Link to your store's Terms and Conditions and Privacy Policy pages by creating pages for them."
			)
		).toBeInTheDocument();
	} );

	it( 'Reminds users to set a URL for their terms and conditions if they are not in the terms textbox', () => {
		blockSettingsMock.TERMS_URL = '/terms';
		blockSettingsMock.PRIVACY_URL = '/privacy';
		const { container } = render(
			<Edit
				attributes={ {
					text: 'I agree to the terms and conditions',
					checkbox: true,
				} }
				setAttributes={ () => void 0 }
			/>
		);

		expect(
			queryByText(
				container,
				'Ensure you add links to your policy pages in this section.'
			)
		).toBeInTheDocument();
	} );

	it( 'Shows no notices if the terms and privacy urls are set up and in the textbox', () => {
		blockSettingsMock.TERMS_URL = '/terms';
		blockSettingsMock.PRIVACY_URL = '/privacy';
		const { container } = render(
			<Edit
				attributes={ {
					text: 'I agree to the <a href="/terms">terms</a> and <a href="/privacy">privacy</a>',
					checkbox: true,
				} }
				setAttributes={ () => void 0 }
			/>
		);

		expect(
			queryByText(
				container,
				'Ensure you add links to your policy pages in this section'
			)
		).not.toBeInTheDocument();
	} );
} );
