const modalWrapper = document.querySelector(".modal__wrapper");

export function openModal(contentForModalStr, button, func) {
	const modalWindow = document.querySelector(".modal__content");

	if (button) {
		button.addEventListener("click", () => {
			modalWindow.innerHTML = contentForModalStr;
			modalWrapper.classList.add("modal__wrapper--active");

			if (func) func();
		});
	} else {
		modalWindow.innerHTML = contentForModalStr;
		modalWrapper.classList.add("modal__wrapper--active");

		if (func) func();
	}
}

export function closeModal() {
	modalWrapper.classList.remove("modal__wrapper--active");
}

export function generateHTMLMessageModal(srcImg, text) {
	return `
		<div class="modal__message">
			<img src="${srcImg}" alt="" width="80" class="modal__message-image" />
			<p class="modal__message-text">${text}</p>
		</div>
	`;
}

function closeModalClick() {
	modalWrapper.addEventListener("click", (event) => {
		const target = event.target;

		if (target.closest(".modal") && !target.closest(".modal__close")) {
			return;
		}

		modalWrapper.classList.remove("modal__wrapper--active");
	});
}
closeModalClick();
