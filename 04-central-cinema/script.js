function solve() {
    const onScreenUl = document.querySelector('#movies ul');
    const archiveUl = document.querySelector('#archive ul');
    document.querySelector('#container button').addEventListener('click', onAdd);
    document.querySelector('#archive > button').addEventListener('click', () => archiveUl.replaceChildren());

    function onAdd(event) {
        event.preventDefault();
        const [nameRef, hallRef, priceRef] = document.querySelectorAll('#container input');
        const price = Number(priceRef.value);

        if (!nameRef.value.trim()
            || !hallRef.value.trim()
            || !priceRef.value.trim()
            || isNaN(price)
            || price <= 0) return;

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = nameRef.value;

        const strong = document.createElement('strong');
        strong.textContent = `Hall: ${hallRef.value}`;

        const div = document.createElement('div');

        const divStrong = document.createElement('strong');
        divStrong.textContent = price.toFixed(2);

        const input = document.createElement('input');
        input.placeholder = 'Tickets Sold';

        const button = document.createElement('button');
        button.textContent = 'Archive';
        button.addEventListener('click', onArchive);

        div.append(divStrong, input, button);
        li.append(span, strong, div);
        onScreenUl.appendChild(li);
        
        [nameRef, hallRef, priceRef].forEach(ref => ref.value = '');
    }

    function onArchive(event) {
        const li = event.target.closest('li');
        const div = event.currentTarget.parentElement;
        const inputRef = div.querySelector('input');
        const input = inputRef.value.trim();

        if (!input || isNaN(Number(input)) || input < 0) return;

        const ticketsCount = Number(input);
        const ticketPrice = Number(div.querySelector('strong').textContent); 
        const totalProfit = ticketsCount * ticketPrice;

        li.querySelector('strong').textContent = `Total amount: ${totalProfit.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', ()=> li.remove());

        div.replaceWith(deleteBtn);
        archiveUl.appendChild(li);
    }
}