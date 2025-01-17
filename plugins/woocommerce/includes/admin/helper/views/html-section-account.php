<?php defined( 'ABSPATH' ) or exit(); ?>

<a class="button button-update" href="<?php echo esc_url( $refresh_url ); ?>"><span class="dashicons dashicons-image-rotate"></span> <?php esc_html_e( 'Update', 'poocommerce' ); ?></a>
<div class="user-info">
	<header>
		<p><?php esc_html_e( 'Connected to PooCommerce.com', 'poocommerce' ); ?> <span class="chevron dashicons dashicons-arrow-down-alt2"></span></p>
	</header>
	<section>
		<p><?php echo get_avatar( $auth_user_data['email'], 48 ); ?> <?php echo esc_html( $auth_user_data['email'] ); ?></p>
		<div class="actions">
			<a class="" href="https://poocommerce.com/my-account/my-subscriptions/" target="_blank"><span class="dashicons dashicons-admin-generic"></span> <?php esc_html_e( 'My Subscriptions', 'poocommerce' ); ?></a>
			<a class="" href="<?php echo esc_url( $disconnect_url ); ?>"><span class="dashicons dashicons-no"></span> <?php esc_html_e( 'Disconnect', 'poocommerce' ); ?></a>
		</div>
	</section>
</div>
