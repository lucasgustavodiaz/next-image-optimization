import Image from 'next/image'
import img1 from '../public/img1.jpg'
import img2 from '../public/img2.jpg'
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl'
import { dynamicBlurDataUrl } from '@/utils/dynamicBlurDataUrl'

const imgUrls = [
  'https://res.cloudinary.com/du9iv5ezw/image/upload/v1693070103/photo-1550745165-9bc0b252726f_vbcvgu.jpg',
  'https://res.cloudinary.com/du9iv5ezw/image/upload/v1693070123/photo-1612287230202-1ff1d85d1bdf_nyduyb.jpg',
  'https://res.cloudinary.com/du9iv5ezw/image/upload/v1693070133/photo-1511512578047-dfb367046420_izh7ly.jpg',
  'https://res.cloudinary.com/du9iv5ezw/image/upload/v1693070139/photo-1616588589676-62b3bd4ff6d2_tcsolo.jpg',
  'https://res.cloudinary.com/du9iv5ezw/image/upload/v1693070147/photo-1585620385456-4759f9b5c7d9_kxfigz.jpg'
]

export default async function Home() {
  const placeholders = await Promise.all(
    imgUrls.map(url => dynamicBlurDataUrl(url))
  )

  // console.log(placeholders)

  return (
    <main className='flex min-h-screen flex-col gap-5 p-5'>
      {/* Remote Images */}
      {imgUrls.map((url, index) => (
        <Image
          key={index}
          src={url}
          alt='Imagen 1'
          width={100}
          height={100}
          style={{ width: '100%', height: 'auto' }}
          sizes='(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw'
          quality={60} // default 75
          placeholder='blur'
          // blurDataURL={staticBlurDataUrl()}
          blurDataURL={placeholders[index]}
          priority={index < 1 ? true : false}
          // max-width: 425px <=> 425+(425* (100-78) / 100) = 531.2px
          // max-width: 531.2px => size=50vw
          // max-width: 50px <=> 50+(50* (100-50) / 100) = 75px
          // max-width: 75px => size=2vw
          className='rounded-lg'
        />
      ))}

      {/* Local Images */}
      {/* <Image
        src={img1}
        alt='Imagen 1'
        width={100}
        height={100}
        style={{ width: '100%', height: 'auto' }}
        sizes='(max-width: 425px) 50vw, 75vw'
        quality={60} // default 75
        placeholder='blur'
        // max-width: 425px <=> 425+(425* (100-78) / 100) = 531.2px
        // max-width: 531.2px => size=50vw
        className='mb-5'
      />
      <Image
        src={img2}
        alt='Imagen 2'
        width={100}
        height={100}
        style={{ width: '100%', height: 'auto' }}
        sizes='(max-width: 425px) 50vw, 75vw'
        quality={60} // default 75
        placeholder='blur'
        // max-width: 425px <=> 425+(425* (100-78) / 100) = 531.2px
        // max-width: 531.2px => size=50vw
        className='mb-5'
      /> */}
    </main>
  )
}
