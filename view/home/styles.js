import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const imageWidth  = Dimensions.get('window').width/2;

export default EStyleSheet.create({
    containerImage : {
        position: 'relative', flex: 3, resizeMode: 'contain', width: imageWidth 
    }
})