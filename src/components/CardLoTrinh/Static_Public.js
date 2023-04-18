import React from 'react'
import { DesktopResponsive, TabletResponsive } from '../../HOC/Responsive'
import Static_Public_Desktop from './Static_Public_Desktop'
import Static_Public_Tablet from './Static_Public_Tablet'

export default function Static_Public({ loTrinhPublic, isBlackFridayDay = false }) {

  return (
    <>
      <DesktopResponsive>
        <Static_Public_Desktop loTrinhPublic={loTrinhPublic} isBlackFridayDay={isBlackFridayDay} />
      </DesktopResponsive>
      <TabletResponsive>
        <Static_Public_Tablet loTrinhPublic={loTrinhPublic} isBlackFridayDay={isBlackFridayDay} />
      </TabletResponsive>
    </>
  )
}
