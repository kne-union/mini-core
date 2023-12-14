import Taro from '@tarojs/taro';
import {useCallback, useState} from 'react';

const useFilePreview = ({originalName, url}) => {
    const [loading, setLoading] = useState(false);
    const type = originalName.split(".")[1];
    const onPreview = useCallback(() => {
        setLoading(true);
        if (['png', 'jpg', 'jpeg'].includes(type.toLowerCase())) {
            Taro.previewImage({
                urls: [url]
            })
            setLoading(false);
            return;
        }
        Taro.downloadFile({
            url, success: (res) => {
                const filePath = res.tempFilePath;
                Taro.openDocument({
                    filePath: filePath, success: (res) => {
                        setLoading(false);
                    }, complete: () => {
                        setLoading(false);
                    }, fail: () => {
                        Taro.showToast({
                            title: '打开文档失败', duration: 1000
                        });
                    }
                })
            }, fail: () => {
                Taro.showToast({
                    title: '打开文档失败', duration: 1000
                });
                setLoading(false);
            }
        });
    }, [type, url]);

    return {
        loading, onPreview
    };

};

export default useFilePreview;
