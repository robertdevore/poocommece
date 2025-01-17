/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useState, useCallback } from '@wordpress/element';
import { recordEvent } from '@poocommerce/tracks';

/**
 * Internal dependencies
 */
import CartModal from '~/dashboard/components/cart-modal';
import { WC_ASSET_URL } from '../../../../utils/admin-settings';

const PurchaseHeader = ( { task } ) => {
	const [ cartModalOpen, setCartModalOpen ] = useState( false );

	const toggleCartModal = useCallback( () => {
		if ( ! cartModalOpen ) {
			recordEvent( 'tasklist_purchase_extensions' );
		}

		setCartModalOpen( ! cartModalOpen );
	}, [ cartModalOpen ] );

	return (
		<div className="poocommerce-task-header__contents-container">
			<img
				alt={ __( 'Purchase illustration', 'poocommerce' ) }
				src={
					WC_ASSET_URL + 'images/task_list/purchase-illustration.png'
				}
				className="svg-background"
			/>
			<div className="poocommerce-task-header__contents">
				<h1>{ task.title }</h1>
				<p>
					{ __(
						'Good choice! You chose to add amazing new features to your store. Continue to checkout to complete your purchase.',
						'poocommerce'
					) }
				</p>
				<Button
					isSecondary={ task.isComplete }
					isPrimary={ ! task.isComplete }
					onClick={ toggleCartModal }
				>
					{ __( 'Continue', 'poocommerce' ) }
				</Button>
			</div>
			{ cartModalOpen && (
				<CartModal
					onClose={ () => toggleCartModal() }
					onClickPurchaseLater={ () => toggleCartModal() }
				/>
			) }
		</div>
	);
};

export default PurchaseHeader;
