<?php
/**
 * Beta Tester plugin settings class
 *
 * @package WC_Beta_Tester
 */

defined( 'ABSPATH' ) || exit;

/**
 * Settings Class.
 */
class WC_Beta_Tester_Channel {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'admin_init', array( $this, 'settings_init' ) );
		add_action( 'admin_menu', array( $this, 'add_to_menus' ) );
	}

	/**
	 * Initialise settings
	 */
	public function settings_init() {
		register_setting( 'wc-beta-tester', 'wc_beta_tester_options' );

		add_settings_section(
			'wc-beta-tester-update',
			__( 'Settings', 'poocommerce-beta-tester' ),
			array( $this, 'update_section_html' ),
			'wc-beta-tester'
		);

		add_settings_field(
			'wc-beta-tester-channel',
			__( 'Release Channel', 'poocommerce-beta-tester' ),
			array( $this, 'version_select_html' ),
			'wc-beta-tester',
			'wc-beta-tester-update',
			array(
				'label_for' => 'channel',
			)
		);

		add_settings_field(
			'wc-beta-tester-auto-update',
			__( 'Automatic Updates', 'poocommerce-beta-tester' ),
			array( $this, 'automatic_update_checkbox_html' ),
			'wc-beta-tester',
			'wc-beta-tester-update',
			array(
				'label_for' => 'auto_update',
			)
		);
	}

	/**
	 * Update section HTML output.
	 *
	 * @param array $args Arguments.
	 */
	public function update_section_html( $args ) {
		?>
		<p id="<?php echo esc_attr( $args['id'] ); ?>"><?php esc_html_e( 'The following settings allow you to choose which PooCommerce updates to receive on this site, including beta and RC versions not quite ready for production deployment.', 'poocommerce-beta-tester' ); ?></p>
		<?php
	}

	/**
	 * Version select markup output.
	 *
	 * @param array $args Arguments.
	 */
	public function version_select_html( $args ) {
		$settings = WC_Beta_Tester::get_settings();
		$channels = array(
			'beta'   => array(
				'name'        => __( 'Beta Releases', 'poocommerce-beta-tester' ),
				'description' => __( 'Beta releases contain experimental functionality for testing purposes only. This channel will also include RC and stable releases if more current.', 'poocommerce-beta-tester' ),
			),
			'rc'     => array(
				'name'        => __( 'Release Candidates', 'poocommerce-beta-tester' ),
				'description' => __( 'Release candidates are released to ensure any critical problems have not gone undetected. This channel will also include stable releases if more current.', 'poocommerce-beta-tester' ),
			),
			'stable' => array(
				'name'        => __( 'Stable Releases', 'poocommerce-beta-tester' ),
				'description' => __( 'This is the default behavior in WordPress.', 'poocommerce-beta-tester' ),
			),
		);
		echo '<fieldset><legend class="screen-reader-text"><span>' . esc_html__( 'Update Channel', 'poocommerce-beta-tester' ) . '</span></legend>';
		foreach ( $channels as $channel_id => $channel ) {
			?>
			<label>
				<input type="radio" id="<?php echo esc_attr( $args['label_for'] ); ?>" name="wc_beta_tester_options[<?php echo esc_attr( $args['label_for'] ); ?>]" value="<?php echo esc_attr( $channel_id ); ?>" <?php checked( $settings->{ $args['label_for'] }, $channel_id ); ?> />
				<?php echo esc_html( $channel['name'] ); ?>
				<p class="description">
					<?php echo esc_html( $channel['description'] ); ?>
				</p>
			</label>
			<br>
			<?php
		}
		echo '</fieldset>';
	}

	/**
	 * Auto updates checkbox markup output.
	 *
	 * @param array $args Arguments.
	 */
	public function automatic_update_checkbox_html( $args ) {
		$settings = WC_Beta_Tester::get_settings();
		?>
		<label for="<?php echo esc_attr( $args['label_for'] ); ?>">
			<input type="checkbox" id="<?php echo esc_attr( $args['label_for'] ); ?>" name="wc_beta_tester_options[<?php echo esc_attr( $args['label_for'] ); ?>]" value="1" <?php checked( $settings->{ $args['label_for'] }, true ); ?> />
			<?php echo esc_html__( 'If enabled, PooCommerce will update to the latest release in the background. Use with caution; we do not recommend using this on production stores!', 'poocommerce-beta-tester' ); ?>
		</label>
		<?php
	}

	/**
	 * Add options page to menu
	 */
	public function add_to_menus() {
		add_submenu_page( 'plugins.php', __( 'PooCommerce Beta Tester', 'poocommerce-beta-tester' ), __( 'WC Beta Tester', 'poocommerce-beta-tester' ), 'install_plugins', 'wc-beta-tester', array( $this, 'settings_page_html' ) );
	}

	/**
	 * Output settings HTML
	 */
	public function settings_page_html() {
		if ( ! current_user_can( 'install_plugins' ) ) {
			return;
		}

		// This is just for giving a message, the option form itself will have validated the nonce.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( isset( $_GET['settings-updated'] ) ) {
			add_settings_error( 'wc-beta-tester-messages', 'wc-beta-tester-message', __( 'Settings Saved', 'poocommerce-beta-tester' ), 'updated' );
		}

		// show error/update messages.
		settings_errors( 'wc-beta-tester-messages' );

		?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
		<?php

		settings_fields( 'wc-beta-tester' );
		do_settings_sections( 'wc-beta-tester' );
		submit_button();

		?>
			</form>
		</div>
		<?php
	}
}

new WC_Beta_Tester_Channel();
