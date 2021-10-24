import { getSignedInClient, getSignedInClientFormData } from './auth/SignedInClient.service';

class CRUDService {
    async findAll(uri, params) {
        const client = await getSignedInClient();
        const data = client.get(uri, {
            params: params
        }).then(response => {
            return response.data;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async create(uri, params) {
        const client = await getSignedInClient();
        const data = client.post(uri, params).then(response => {
            return response;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async createFormData(uri, params) {
        const client = await getSignedInClientFormData();
        const data = client.post(uri, params).then(response => {
            return response.data;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async findOneById(uri) {
        const client = await getSignedInClient();
        const data = client.get(uri).then(response => {
            return response.data;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async updateOneById(uri, id, post) {
        const client = await getSignedInClient();
        const data = client.put(`${uri}/${id}`, post).then(response => {
            return response.data;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async deleteOneById(uri, id) {
        const client = await getSignedInClient();
        const data = client.delete(`${uri}/${id}`).then(response => {
            return true;
        }).catch(error => {
            return null;
        });

        return data;
    };

    async delete(uri, data) {
        const client = await getSignedInClient();
        const result = client.delete(uri, { params: data }).then(response => {
            return true;
        }).catch(error => {
            return null;
        });

        return result;
    };
}

export default new CRUDService();