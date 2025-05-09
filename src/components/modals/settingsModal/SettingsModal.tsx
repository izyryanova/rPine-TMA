import React, { useState } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import SwapSettings from '../../SwapSettings/SwapSettings';
import Footer from '../../../widgets/footer/Footer';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
	const { t } = useTranslation();
	return (
		<AnimatePresence>
			{isOpen && (
				<div className={styles.modalOverlay} onClick={onClose}>
					<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ duration: 0.2 }}
						>
							<div className={styles.modalHeader}>
								<h2 className={styles.modalTitle}>{t('settings_header')}</h2>
								<button
									className={styles.closeButton}
									onClick={onClose}
									type="button"
								>
									<svg className={styles.closeIcon} width="30" height="30" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M13 0.8125C10.5895 0.8125 8.23322 1.52728 6.22899 2.86646C4.22477 4.20564 2.66267 6.10907 1.74022 8.33604C0.817781 10.563 0.576428 13.0135 1.04668 15.3777C1.51694 17.7418 2.67769 19.9134 4.38214 21.6179C6.08659 23.3223 8.2582 24.4831 10.6223 24.9533C12.9865 25.4236 15.437 25.1822 17.664 24.2598C19.8909 23.3373 21.7944 21.7752 23.1335 19.771C24.4727 17.7668 25.1875 15.4105 25.1875 13C25.1813 9.76958 23.8953 6.67324 21.611 4.38898C19.3268 2.10472 16.2304 0.818694 13 0.8125V0.8125ZM17.418 16.082C17.594 16.2598 17.6928 16.4998 17.6928 16.75C17.6928 17.0002 17.594 17.2402 17.418 17.418C17.2388 17.5912 16.9993 17.6881 16.75 17.6881C16.5007 17.6881 16.2612 17.5912 16.082 17.418L13 14.3242L9.91797 17.418C9.73878 17.5912 9.49927 17.6881 9.25 17.6881C9.00074 17.6881 8.76123 17.5912 8.58204 17.418C8.40599 17.2402 8.30723 17.0002 8.30723 16.75C8.30723 16.4998 8.40599 16.2598 8.58204 16.082L11.6758 13L8.58204 9.91797C8.43254 9.73582 8.35614 9.50457 8.3677 9.26921C8.37926 9.03385 8.47795 8.8112 8.64458 8.64457C8.8112 8.47795 9.03385 8.37925 9.26921 8.36769C9.50457 8.35614 9.73582 8.43253 9.91797 8.58203L13 11.6758L16.082 8.58203C16.2642 8.43253 16.4954 8.35614 16.7308 8.36769C16.9662 8.37925 17.1888 8.47795 17.3554 8.64457C17.5221 8.8112 17.6208 9.03385 17.6323 9.26921C17.6439 9.50457 17.5675 9.73582 17.418 9.91797L14.3242 13L17.418 16.082Z" fill="#ECECEC" />
									</svg>
								</button>
							</div>
							<div className={styles.modalBody}>
								<SwapSettings />
							</div>
							<div className={styles.modalFooter}>
								<motion.button
									className={styles.saveButton}
									onClick={onClose}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.95 }}
								>
									{t('settings_save_button')}
								</motion.button>
							</div>
							<Footer />
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
};

export const useSettingsModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openSettingsModal = () => setIsModalOpen(true);
	const closeSettingsModal = () => setIsModalOpen(false);

	const SettingsModalComponent = (
		<SettingsModal
			isOpen={isModalOpen}
			onClose={closeSettingsModal}
		/>
	);

	return {
		openSettingsModal,
		closeSettingsModal,
		SettingsModalComponent
	};
};

export default SettingsModal; 