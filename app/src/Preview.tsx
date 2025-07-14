import { useEffect, useRef, useState } from "react";
import { Scene, WebGLRenderer, OrthographicCamera, Box3, MOUSE, LinearToneMapping, SRGBColorSpace, Color } from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
// @ts-ignore
import { DXFViewer } from "three-dxf-viewer"

export type PreviewProps = {
	src: string | File
}

export const Preview = (props: PreviewProps) => {
	const { src } = props

	const drawCanvasRef = useRef<HTMLCanvasElement | null>( null );
	const canvasRef = useRef<HTMLCanvasElement | null>( null );
	const [ dxfData, setDxfData ] = useState( null );
	const [ scene ] = useState( new Scene() );

 // Load DXF when src changes
 useEffect(() => {
	const loadDXF = async () => {
		if (!src) return;

		const font = '/fonts/helvetiker_regular.typeface.json';

		try {
			const viewer = new DXFViewer();
			const dxf = typeof src === "string" ?
				await viewer.getFromPath(src, font) :
				await viewer.getFromFile(src, font);

			scene.clear(); // remove old objects before adding new
			scene.add(dxf);
			setDxfData(dxf);
		} catch (error) {
			console.error('Error loading DXF file:', error);
		}
	};

	loadDXF();
}, [src, scene]);


	useEffect( () => {
		if (canvasRef.current === null) {
			return;
		}

		// renderer
		const renderer = new WebGLRenderer( {
			canvas: canvasRef.current,
			preserveDrawingBuffer: true
		} );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.toneMapping = LinearToneMapping;
		renderer.toneMappingExposure = 3;

		// scene
		scene.background = new Color( 0x212830 );

		// camera
		const size = 10000;
		let aspect = canvasRef.current.offsetWidth / canvasRef.current.offsetHeight;
		const camera = new OrthographicCamera( -size * aspect , size * aspect , size, -size, -size/2, size );

		//controls
		const controls = new OrbitControls ( camera, renderer.domElement );
		controls.zoomSpeed = 2;
		controls.enableRotate = false;
		controls.mouseButtons = {
			LEFT: MOUSE.PAN,
			MIDDLE: MOUSE.DOLLY,
			RIGHT: MOUSE.PAN
		};

		// Animation loop
		const animate = () => {
			requestAnimationFrame( animate );
	  controls.update();
			renderer.render( scene, camera );
		}

		const centerCamera = () => {
			let box = new Box3().setFromObject( scene );

			let bigAxis = box.max.x - box.min.x > box.max.y - box.min.y ? 'x' : 'y';
			let size = bigAxis === 'x' ? box.max.x - box.min.x : box.max.y - box.min.y;
			let sizeFrustum = bigAxis === 'x' ? camera.right - camera.left : camera.top - camera.bottom;

			let lateralMargin = 0.9; //percentage of screento leave on the sides. 1 means no margin
			if( size < sizeFrustum ) {
				camera.zoom = lateralMargin * ( sizeFrustum / size );
				camera.updateProjectionMatrix();
			} else {
				camera.zoom = 1;

			}

			let center = box.min.add( box.max.sub( box.min ).divideScalar( 2 ) );

			camera.position.set( center.x , center.y, center.z + 100 );
			controls.target.set( camera.position.x, camera.position.y, center.z );

			camera.updateProjectionMatrix();
		}

		if( dxfData ) centerCamera();
		animate();

		drawCanvasRef.current = renderer.domElement

		return () => {
			// Cleanup on unmount
			renderer.dispose();
		};
	}, [ dxfData ] );


	const handleDownload = async () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;

    try {
      const file = await canvasToFile(canvas, "drawing.png");
      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export canvas:", error);
    }
	}


	return (
		<>
			<button type="button" onClick={handleDownload}>download</button>
			<canvas id="2d" ref={canvasRef} style={{ width: '100%', height: '100%', visibility: "hidden" }} />
		</>
	);
}

export const canvasToFile = (
  canvas: HTMLCanvasElement,
  filename = "canvas.png",
): Promise<File> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas toBlob failed"));
        return;
      }
      const file = new File([blob], filename, { type: "image/png" });
      resolve(file);
    }, "image/png");
  })
}
