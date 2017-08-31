import devStoreFactory from '@store/store-factory.dev'
import prodStoreFactory from '@store/store-factory.prod'

export default (process.env.NODE_ENV === 'production') ? prodStoreFactory : devStoreFactory
