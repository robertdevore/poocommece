/**
 * External dependencies
 */
import React from 'react';
import { __ } from '@wordpress/i18n';
import { Pill } from '@poocommerce/components';

/**
 * Internal dependencies
 */
import './status-badge.scss';

interface StatusBadgeProps {
	/**
	 * Status of the badge. This decides which class to apply, and what the
	 * status message should be.
	 */
	status:
		| 'active'
		| 'inactive'
		| 'needs_setup'
		| 'test_mode'
		| 'recommended'
		| 'has_incentive';
	/**
	 * Override the default status message to display a custom one. Optional.
	 */
	message?: string;
}

/**
 * A component that displays a status badge with a customizable appearance and message.
 * The appearance and default message are determined by the `status` prop, but a custom message can be provided via the `message` prop.
 *
 * @example
 * // Render a status badge with the default message for "active" status.
 * <StatusBadge status="active" />
 *
 * @example
 * // Render a status badge with a custom message.
 * <StatusBadge status="inactive" message="Not in use" />
 */
export const StatusBadge = ( { status, message }: StatusBadgeProps ) => {
	/**
	 * Get the appropriate CSS class for the badge based on the status.
	 */
	const getStatusClass = () => {
		switch ( status ) {
			case 'active':
			case 'has_incentive':
				return 'poocommerce-status-badge--success';
			case 'needs_setup':
			case 'test_mode':
				return 'poocommerce-status-badge--warning';
			case 'recommended':
			case 'inactive':
				return 'poocommerce-status-badge--info';
			default:
				return '';
		}
	};

	/**
	 * Get the default message for the badge based on the status.
	 */
	const getStatusMessage = () => {
		switch ( status ) {
			case 'active':
				return __( 'Active', 'poocommerce' );
			case 'inactive':
				return __( 'Inactive', 'poocommerce' );
			case 'needs_setup':
				return __( 'Action needed', 'poocommerce' );
			case 'test_mode':
				return __( 'Test mode', 'poocommerce' );
			case 'recommended':
				return __( 'Recommended', 'poocommerce' );
			default:
				return '';
		}
	};

	return (
		<Pill className={ `poocommerce-status-badge ${ getStatusClass() }` }>
			{ message || getStatusMessage() }
		</Pill>
	);
};
