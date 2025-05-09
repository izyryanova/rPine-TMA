import styles from './Home.module.css'
import TonWalletConnect from '../../components/UI/TonWalletConnectButton/TonWalletConnect';
import SwapHeader from '../../components/swapHeader/swapHeader';
import { useWalletStore } from '../../store/wallet/useWalletStore';
import { useTonConnectUI } from '@tonconnect/ui-react';
import WalletBalance from '../../entities/wallet/components/WalletBalance';
import { Swap } from '../../components/swap/swap';
import BuyNFTPromotion from '../../components/UI/buyNFTPromotion/BuyNFTPromotion';
import { useDispatch, useSelector } from 'react-redux';
import { setForceRefresh } from '../../store/swapRoutes/slice';
import { useSettingsModal } from '../../components/SwapSettings';
import { selectIsIntervalActive } from '../../store/swapRoutes/selectors';

const Home = () => {
	const [tonConnectUI] = useTonConnectUI();
	const { isConnected } = useWalletStore(tonConnectUI);
	const dispatch = useDispatch();
	const { openSettingsModal, SettingsModalComponent } = useSettingsModal();
	const isIntervalActive = useSelector(selectIsIntervalActive);

	const handleRefreshClick = () => {
		dispatch(setForceRefresh(true));
		setTimeout(() => {
			dispatch(setForceRefresh(false));
		}, 100);
	};

	return (
		<>
			<div className={styles.container}>
				<SwapHeader />
				<div className={styles.swap_container}>
					<div className={styles.toolbar}>
						<TonWalletConnect
							customStyle={isConnected ? styles.connectWalletCustomConnected : styles.connectWalletCustom}
						/>
						{isConnected && (
							<div>
								<button className={styles.toolbarButton} onClick={handleRefreshClick}>
									<img
										src="/assets/icons/refresh_icon.svg"
										alt="refresh"
										className={`${styles.toolbarIcon} ${isIntervalActive ? styles.rotating : ''}`}
									/>
								</button>
								<button className={styles.toolbarButton} onClick={openSettingsModal}>
									<img src="/assets/icons/settings_icon.svg" alt="settings" className={styles.toolbarIcon} />
								</button>
							</div>
						)}
					</div>
					<div className={styles.balance_container}>
						<div className={styles.balance_statement}><WalletBalance /></div>
					</div>
					<Swap />
					{!isConnected && <TonWalletConnect />}
				</div>
				<BuyNFTPromotion />
			</div>
			{SettingsModalComponent}
		</>
	);
};

export default Home;