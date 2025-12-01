import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const companies = [
{ name: 'Microsoft', logo: assets.microsoft_logo },
{ name: 'Walmart', logo: assets.walmart_logo },
{ name: 'Accenture', logo: assets.accenture_logo },
{ name: 'Adobe', logo: assets.adobe_logo },
{ name: 'Paypal', logo: assets.paypal_logo },
]

const Companies = () => {
return ( <div className='pt-16 pb-16 '> <p className='text-center text-lg md:text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400'>
Trusted by learners from </p> <div className='flex flex-wrap items-center justify-center gap-10 md:gap-20'>
{companies.map((company, index) => (
<motion.div
key={index}
whileHover={{ scale: 1.2, rotate: 10, boxShadow: '0px 0px 25px 5px rgba(255,255,255,0.6)' }}
whileTap={{ scale: 0.9, rotate: -5 }}
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.15, type: 'spring', stiffness: 120 }}
className='bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center'
> <img
           src={company.logo}
           alt={company.name}
           className='w-28 md:w-36 object-contain filter brightness-125'
         />
</motion.div>
))} </div> </div>
)
}

export default Companies
