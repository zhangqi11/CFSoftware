/** created by zhangqi on 2017-9-8 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableNativeFeedback,
    Alert,
} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import Icon from 'react-native-vector-icons/FontAwesome';
import hanZiLetter from '../../utils/hanZiLetter';
import englishLetter from '../../utils/englishLetter';
import theme from '../../theme';

const WODetailHeader = ({ workOrderDetail }) => {
    function handleRandomColor(text) {
        // 根据字母生成颜色
        const arrLetter = hanZiLetter(text)[0].split('');
        const r = arrLetter[0] ? englishLetter(arrLetter[0]) * 5 : 0;
        const g = arrLetter[1] ? englishLetter(arrLetter[1]) * 8 : 0;
        const b = arrLetter[2] ? englishLetter(arrLetter[2]) * 10 : 0;
        return `rgb(${r},${g},${b})`;
    }

    function handleWsStatus(wsStatus) {
        switch (wsStatus) {
            case 0:
                return '未评审';
            case 1:
                return '已评审';
            default:
                return '未识别编码';
        }
    }

    function handleIconPress() {
        Alert.alert(
            '询问',
            '您是否确定拨打此电话？',
            [
                {
                    text: '取消',
                    style: 'cancel',
                },
                {
                    text: '是',
                    onPress: () => {
                        SendIntentAndroid.sendPhoneDial('17705158337');
                    },
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        }}
        >
            <View
                style={[
                    {
                        width: 44,
                        height: 44,
                        flex: -1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 22,
                    },
                    workOrderDetail.personname &&
                    {
                        backgroundColor:
                            handleRandomColor(workOrderDetail.personname),
                    },
                ]}
            >
                <Text style={{
                    color: '#ffffff',
                    fontSize: 12,
                }}
                >{workOrderDetail.personname && workOrderDetail.personname.slice(-2)}</Text>
            </View>
            <View style={{ flex: 0.05 }} />
            <View style={{ flex: 0.4 }}>
                <Text>{workOrderDetail.personname}</Text>
                <Text>{handleWsStatus(workOrderDetail.wsstatus)}</Text>
            </View>
            <View style={{ flex: 0.15 }} />
            {
                (workOrderDetail.wsstatus === 1 && workOrderDetail.assginpersonname) &&
                <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>负责人</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}
                    >
                        <Text>{workOrderDetail.assginpersonname}</Text>
                        <TouchableNativeFeedback
                            onPress={() => handleIconPress()}
                            background={TouchableNativeFeedback.Ripple(theme.rippleColor)}
                        >
                            <Icon name="phone" size={20} color={'#79B23D'} />
                        </TouchableNativeFeedback>
                    </View>
                </View>
            }
        </View>
    );
};

WODetailHeader.propTypes = {
    workOrderDetail: PropTypes.object.isRequired,
};

export default WODetailHeader;
