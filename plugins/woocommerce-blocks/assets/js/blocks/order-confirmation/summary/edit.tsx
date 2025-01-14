/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { formatPrice } from '@poocommerce/price-format';
import { date } from '@wordpress/date';
import { getSetting } from '@poocommerce/settings';

/**
 * Internal dependencies
 */
import './style.scss';

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-order-confirmation-summary',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<ul className="wc-block-order-confirmation-summary-list">
					<li className="wc-block-order-confirmation-summary-list-item">
						<span className="wc-block-order-confirmation-summary-list-item__key">
							{ __( 'Order number:', 'poocommerce' ) }
						</span>{ ' ' }
						<span className="wc-block-order-confirmation-summary-list-item__value">
							123
						</span>
					</li>
					<li className="wc-block-order-confirmation-summary-list-item">
						<span className="wc-block-order-confirmation-summary-list-item__key">
							{ __( 'Date:', 'poocommerce' ) }
						</span>{ ' ' }
						<span className="wc-block-order-confirmation-summary-list-item__value">
							{ date(
								getSetting( 'dateFormat' ),
								new Date(),
								undefined
							) }
						</span>
					</li>
					<li className="wc-block-order-confirmation-summary-list-item">
						<span className="wc-block-order-confirmation-summary-list-item__key">
							{ __( 'Total:', 'poocommerce' ) }
						</span>{ ' ' }
						<span className="wc-block-order-confirmation-summary-list-item__value">
							{ formatPrice( 4000 ) }
						</span>
					</li>
					<li className="wc-block-order-confirmation-summary-list-item">
						<span className="wc-block-order-confirmation-summary-list-item__key">
							{ __( 'Email:', 'poocommerce' ) }
						</span>{ ' ' }
						<span className="wc-block-order-confirmation-summary-list-item__value">
							test@test.com
						</span>
					</li>
					<li className="wc-block-order-confirmation-summary-list-item">
						<span className="wc-block-order-confirmation-summary-list-item__key">
							{ __( 'Payment method:', 'poocommerce' ) }
						</span>{ ' ' }
						<span className="wc-block-order-confirmation-summary-list-item__value">
							{ __( 'Credit Card', 'poocommerce' ) }
						</span>
					</li>
				</ul>
			</Disabled>
		</div>
	);
};

export default Edit;
