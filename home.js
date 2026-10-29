const noticeCloseButton = document.querySelector('.notice-close');

noticeCloseButton?.addEventListener('click', () => {
	document.querySelector('.portfolio-notice')?.remove();
});
