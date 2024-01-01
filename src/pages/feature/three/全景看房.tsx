import { memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { useWindowEventListener } from '~/packages/y-hooks'

import up from '@/assets/img/room/up.jpg'
import down from '@/assets/img/room/down.jpg'
import left from '@/assets/img/room/left.jpg'
import right from '@/assets/img/room/right.jpg'
import before from '@/assets/img/room/before.jpg'
import after from '@/assets/img/room/after.jpg'

function 全景看房() {
    const container = useRef<HTMLDivElement>(null)
    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    )
    camera.position.z = 0.1

    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    const render = () => {
        renderer.render(scene, camera)
        // 反复渲染每一帧
        requestAnimationFrame(render)
    }

    // 创建材质
    const imgArr = [right, left, up, down, before, after]
    const boxMaterials: any[] = []
    imgArr.forEach((item) => {
        const texture = new THREE.TextureLoader().load(item)
        // 按中心旋转指定图片
        if (item.includes('down')) {
            texture.rotation = -52
            texture.center = new THREE.Vector2(0.5, 0.5)
        }
        boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    })
    // 创建几何对象
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 创建立方体并添加材质
    const cube = new THREE.Mesh(geometry, boxMaterials)
    cube.geometry.scale(1, 1, -1)
    // 将立方体添加到场景
    scene.add(cube)

    // 响应式画布
    useWindowEventListener(
        'resize',
        () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(window.devicePixelRatio)
        },
        [],
        { delay: 300 },
    )

    useEffect(() => {
        if (!container.current) {
            return
        }

        // 创建控制器
        const controls = new OrbitControls(camera, container.current)
        controls.maxDistance = 0.5
        controls.enableDamping = true
        container.current?.appendChild(renderer.domElement)
        render()
    }, [])

    return <div ref={container}></div>
}

export default memo(全景看房)
