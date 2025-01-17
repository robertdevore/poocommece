/**
 * External dependencies
 */
import { SHOP_URL } from '@poocommerce/block-settings';
import Button from '@poocommerce/base-components/button';
import clsx from 'clsx';

/**
 * Internal dependencies
 */
import { defaultStartShoppingButtonLabel } from './constants';
import { getVariant } from '../utils';

type MiniCartShoppingButtonBlockProps = {
	className: string;
	startShoppingButtonLabel: string;
};

const Block = ( {
	className,
	startShoppingButtonLabel,
}: MiniCartShoppingButtonBlockProps ): JSX.Element | null => {
	if ( ! SHOP_URL ) {
		return null;
	}

	return (
		<div className="wp-block-button has-text-align-center">
			<Button
				className={ clsx(
					className,
					'wp-block-button__link',
					'wc-block-mini-cart__shopping-button'
				) }
				variant={ getVariant( className, 'contained' ) }
				href={ SHOP_URL }
			>
				{ startShoppingButtonLabel || defaultStartShoppingButtonLabel }
			</Button>
		</div>
	);
};

export default Block;
