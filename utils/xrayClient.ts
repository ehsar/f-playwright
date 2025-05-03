import axios from 'axios';

export async function pushStepsToXray(token: string, payload: any) {
    const res = await axios.post(
        'https://xray.cloud.getxray.app/api/v2/import/test',
        payload,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            },
        }
    );
    console.log('🚀 Pushed steps to Xray');
    return res.data;
}