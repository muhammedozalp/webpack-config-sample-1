/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
class FetchUtil {
    /**
     * This method is used for POST
     * Now it is using only by Haftanın Yayınevi at homepage
     * @param {*} listID gives the product ids to be displayed
     * @returns
     */
    prepPostData(listID) {
        return new Promise((resolve) => {
            const data = {
                req: {
                }
            };

            data.req.method = 'POST';
            data.req.body = new URLSearchParams({
                product_ids: preU.stPPrIds[0][listID]
            });
            data.req.headers = new Headers({
                'Content-ype': 'application/x-www-form-urlencoded; charset=UTF-8'
            });

            resolve(data.req);
            return this;
        });
    }

    isJsonString(text) {
        return new Promise((resolve) => {
            try {
                const obj = JSON.parse(text);

                // More strict checking
                if (obj && typeof obj === 'object') {
                    resolve(JSON.parse(text));
                }
            } catch (e) {
                resolve(text);
            }
            return this;
        });
    }

    /**
     * List Id undefined değilse post işlemi yapılıyordur
     * get işlemi yaparken listId gibi bir 2. parametre göndermeye gerek yok
     * tek parametre gönderilmesi get requesti anlamına geliyor.
     * @param {*} url
     * @param {*} listID
     * @returns
     */
    async fetchData(url, listID) {
        try {
            const data = {
                url: '',
                req: {
                }
            };

            if (typeof listID != 'undefined') {
                data.url = url;
                data.req = await this.prepPostData(listID);
            } else {
                data.url = await url;
            }
            const response = await fetch(data.url, data.req);
            /*
                response.ok;     // => false
                response.status; // => 404
            */

            if (!response.ok) {
                const message = `A ${response.status} fetch error has occured`;
                throw new Error(message);
            }

            let text = await response.text();
            text = await this.isJsonString(text);

            return text;
        } catch (error) {
            throw new Error(`error.message ${error.message}`);
        }
    }
}

export default FetchUtil;
