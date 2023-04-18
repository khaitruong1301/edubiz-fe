import React from 'react'
import { segments } from './segmentArr'
import TagPrize from './tagPrize'

export default function ListPrize() {
    return (
        <div className="flex justify-center space-x-2 flex-wrap ">
            {segments.map((item) => { return <TagPrize stt={item.label} value={item.value} /> })}
        </div>
    )
}