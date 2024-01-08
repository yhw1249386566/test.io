import { memo } from 'react'
import { history } from 'umi'
import { memoizeFn } from '~/packages/y-screw'
import { Button, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Card } from '@/component'

import { FeatureList } from '../constant'

import style from './index.less'

function handleGotoFeature(featureName: string) {
    return memoizeFn(
        () => {
            history.push(`/feature/${featureName}`)
        },
        {
            resolver: featureName,
        },
    )
}

function Index() {
    const data = {
        name: 'image',
        action: 'http://192.168.3.143:4000/upload',
        headers: {},
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
    }

    return (
        <div className={style.index}>
            {FeatureList.map((card, index) => {
                const {
                    tag,
                    img,
                    time,
                    title,
                    author,
                    target,
                    previewImg,
                    description,
                    lastUpdateTime,
                } = card

                return (
                    <Card
                        key={`${index}-${time}`}
                        tag={tag}
                        img={img}
                        time={time}
                        title={title}
                        author={author}
                        previewImg={previewImg}
                        description={description}
                        lastUpdateTime={lastUpdateTime}
                        onClick={handleGotoFeature(target)}
                    />
                )
            })}

            <Upload {...data}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
    )
}

export default memo(Index)
