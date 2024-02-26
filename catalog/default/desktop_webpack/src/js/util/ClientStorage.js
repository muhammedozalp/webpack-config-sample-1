/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
/* eslint-disabl no-undef */
class ClientStorage {
    constructor(lsItemName, ver, elapsedTime) {
        this.lsItemName = lsItemName;
        this.elapsedTime = elapsedTime;
        this.ver = ver;
        this.currentDate = new Date();

        this.lsItemInitialData = {
            ver: this.ver,
            currentDate: this.currentDate
        };
        this.lsItemData = {
        };

        this.initiateLsItemData();
        this.updateItemVersion();
        this.updateItemDate();
    }

    initiateLsItemData() {
        if (typeof localStorage[this.lsItemName] == 'undefined') {
            this.updateLsItemData(this.lsItemInitialData);
        } else {
            this.lsItemData = JSON.parse(localStorage.getItem(this.lsItemName));
        }
    }

    updateItemVersion() {
        if (typeof this.lsItemData.ver == 'undefined' || this.lsItemData.ver !== this.lsItemInitialData.ver) {
            this.lsItemInitialData.currentDate = new Date();
            this.updateLsItemData(this.lsItemInitialData);
        }
    }

    updateItemDate() {
        const timeDiff = Math.round((new Date().getTime()
            - new Date(this.lsItemData.currentDate).getTime()) / 1000 / 60);

        if (typeof this.lsItemData.currentDate != 'undefined') {
            if ((timeDiff >= this.elapsedTime || timeDiff < 0)) {
                this.lsItemInitialData.currentDate = new Date();
                this.updateLsItemData(this.lsItemInitialData);
            }
        } else {
            this.lsItemData.currentDate = new Date();
            this.updateLsItemData(this.lsItemInitialData);
        }
    }

    updateLsItemData(data) {
        localStorage.setItem(this.lsItemName, JSON.stringify(data));
        this.lsItemData = JSON.parse(localStorage.getItem(this.lsItemName));
    }

    setRemoteStorageItem(dataKey, dataValue) {
        this.lsItemData[dataKey] = dataValue;
        this.updateLsItemData(this.lsItemData);
    }

    getRemoteStorageItem(dataKey) {
        const lsData = JSON.parse(localStorage.getItem(this.lsItemName));
        return lsData[dataKey];
    }
}

export { ClientStorage };
