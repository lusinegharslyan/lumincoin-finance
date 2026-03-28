import config from "../config/config";

export class CommonUtils {
    static generateCategoryBlock(categoryItem) {
        const categoryBlockElement = document.createElement('div');
        categoryBlockElement.classList.add('category-block');
        const categoryTitleElement = document.createElement('h2');
        categoryBlockElement.classList.add('category-title');
        categoryBlockElement.innerText = categoryItem.title;
        categoryBlockElement.appendChild(categoryTitleElement);
        const categoryActionsElement = document.createElement('div');
        categoryActionsElement.classList.add('category-actions');
        const actionsUpdateButtonElement = document.createElement('a');
        actionsUpdateButtonElement.innerText = 'Редактировать';
        actionsUpdateButtonElement.className = 'btn btn-primary btn-common category-update-button';
        categoryActionsElement.appendChild(actionsUpdateButtonElement);
        const actionsDeleteButtonElement = document.createElement('button');
        actionsDeleteButtonElement.innerText = 'Удалить';
        actionsDeleteButtonElement.className = 'btn btn-danger btn-common category-delete-button';
        categoryActionsElement.appendChild(actionsDeleteButtonElement);
        categoryBlockElement.appendChild(categoryActionsElement);
        return categoryBlockElement;
    }

    static generateIntervalsBlock() {
        const intervalBlockElement = document.createElement('div');
        intervalBlockElement.classList.add('common-date-filter-toolbar');
        config.intervals.forEach(interval => {
            const intervalButtonElement = document.createElement('button');
            intervalButtonElement.classList.add('btn');
            intervalButtonElement.innerText = interval.label;
            intervalButtonElement.id = interval.interval;
            if(intervalButtonElement.id=== 'today'){
                intervalButtonElement.classList.add('selected');
            }
            intervalBlockElement.appendChild(intervalButtonElement);
        })
        const customIntervalBlockElement = document.createElement('div');
        customIntervalBlockElement.classList.add('common-custom-date-filter');
        customIntervalBlockElement.id = 'custom-date-interval';
        customIntervalBlockElement.innerHTML = `<span>с</span><input type='date' class="custom-date" id="interval-start-date"> <span>по</span><input
            type='date' class="custom-date" id="interval-end-date">`;
        customIntervalBlockElement.style.display = 'none';
        intervalBlockElement.appendChild(customIntervalBlockElement);
        // const dateSpans = customIntervalBlockElement.querySelectorAll('.custom-date');
        //
        // dateSpans.forEach((span,index) => {
        //     span.addEventListener('click', () => {
        //         const input = document.createElement('input');
        //         input.type = 'date';
        //         input.id=`date-${index}`;
        //         input.style.display = 'block';
        //
        //         input.addEventListener('change', () => {
        //             span.innerText = input.value;
        //             span.style.display = 'flex';
        //             input.remove();
        //         });
        //
        //         span.style.display = 'none';
        //         span.parentNode.insertBefore(input, span);
        //         input.focus();
        //     });
        // });
        return intervalBlockElement;
    }

    static getOperationType(type) {
        let typeHtml = null;
        switch (type) {
            case config.operationTypes.income:
                typeHtml = '<span class="text-success"> доход </span>';
                break;
            case config.operationTypes.expense:
                typeHtml = '<span class="text-danger"> расход </span>';
                break;
        }
        return typeHtml
    }
}