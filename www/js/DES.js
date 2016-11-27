//"Generated from Java with JSweet 1.1.0 - http://www.jsweet.org";
var DES = (function () {
    function DES(key) {
        var _this = this;
        this.encryptKeys = new Array(32);
        this.decryptKeys = new Array(32);
        this.tempInts = new Array(2);
        if (((key != null && key instanceof Array) || key === null)) {
            (function () {
                if (key.length === 7) {
                    var key8 = new Array(8);
                    DES.makeSMBKey(key, key8);
                    _this.setKey(key8);
                }
                else {
                    _this.setKey(key);
                }
            })();
        }
        else if (key === undefined) {
            (function () {
            })();
        }
        else
            throw new Error('invalid overload');
    }
    DES.makeSMBKey = function (key7, key8) {
        var i;
        key8[0] = (((key7[0] >> 1) & 255) | 0);
        key8[1] = (((((key7[0] & 1) << 6) | (((key7[1] & 255) >> 2) & 255)) & 255) | 0);
        key8[2] = (((((key7[1] & 3) << 5) | (((key7[2] & 255) >> 3) & 255)) & 255) | 0);
        key8[3] = (((((key7[2] & 7) << 4) | (((key7[3] & 255) >> 4) & 255)) & 255) | 0);
        key8[4] = (((((key7[3] & 15) << 3) | (((key7[4] & 255) >> 5) & 255)) & 255) | 0);
        key8[5] = (((((key7[4] & 31) << 2) | (((key7[5] & 255) >> 6) & 255)) & 255) | 0);
        key8[6] = (((((key7[5] & 63) << 1) | (((key7[6] & 255) >> 7) & 255)) & 255) | 0);
        key8[7] = ((key7[6] & 127) | 0);
        for (i = 0; i < 8; i++) {
            key8[i] = ((key8[i] << 1) | 0);
        }
    };
    DES.prototype.setKey = function (key) {
        this.deskey(key, true, this.encryptKeys);
        this.deskey(key, false, this.decryptKeys);
    };
    DES.prototype.deskey = function (keyBlock, encrypting, KnL) {
        var i;
        var j;
        var l;
        var m;
        var n;
        var pc1m = new Array(56);
        var pcr = new Array(56);
        var kn = new Array(32);
        for (j = 0; j < 56; ++j) {
            l = DES.pc1_$LI$()[j];
            m = l & 7;
            pc1m[j] = ((keyBlock[l >>> 3] & DES.bytebit_$LI$()[m]) !== 0) ? 1 : 0;
        }
        for (i = 0; i < 16; ++i) {
            if (encrypting)
                m = i << 1;
            else
                m = (15 - i) << 1;
            n = m + 1;
            kn[m] = kn[n] = 0;
            for (j = 0; j < 28; ++j) {
                l = j + DES.totrot_$LI$()[i];
                if (l < 28)
                    pcr[j] = pc1m[l];
                else
                    pcr[j] = pc1m[l - 28];
            }
            for (j = 28; j < 56; ++j) {
                l = j + DES.totrot_$LI$()[i];
                if (l < 56)
                    pcr[j] = pc1m[l];
                else
                    pcr[j] = pc1m[l - 28];
            }
            for (j = 0; j < 24; ++j) {
                if (pcr[DES.pc2_$LI$()[j]] !== 0)
                    kn[m] |= DES.bigbyte_$LI$()[j];
                if (pcr[DES.pc2_$LI$()[j + 24]] !== 0)
                    kn[n] |= DES.bigbyte_$LI$()[j];
            }
        }
        this.cookey(kn, KnL);
    };
    DES.prototype.cookey = function (raw, KnL) {
        var raw0;
        var raw1;
        var rawi;
        var KnLi;
        var i;
        for (i = 0, rawi = 0, KnLi = 0; i < 16; ++i) {
            raw0 = raw[rawi++];
            raw1 = raw[rawi++];
            KnL[KnLi] = (raw0 & 16515072) << 6;
            KnL[KnLi] |= (raw0 & 4032) << 10;
            KnL[KnLi] |= (raw1 & 16515072) >>> 10;
            KnL[KnLi] |= (raw1 & 4032) >>> 6;
            ++KnLi;
            KnL[KnLi] = (raw0 & 258048) << 12;
            KnL[KnLi] |= (raw0 & 63) << 16;
            KnL[KnLi] |= (raw1 & 258048) >>> 4;
            KnL[KnLi] |= (raw1 & 63);
            ++KnLi;
        }
    };
    DES.prototype.encrypt = function (clearText, clearOff, cipherText, cipherOff) {
        var _this = this;
        if (((clearText != null && clearText instanceof Array) || clearText === null) && ((typeof clearOff === 'number') || clearOff === null) && ((cipherText != null && cipherText instanceof Array) || cipherText === null) && ((typeof cipherOff === 'number') || cipherOff === null)) {
            return (function () {
                DES.squashBytesToInts(clearText, clearOff, _this.tempInts, 0, 2);
                _this.des(_this.tempInts, _this.tempInts, _this.encryptKeys);
                DES.spreadIntsToBytes(_this.tempInts, 0, cipherText, cipherOff, 2);
            })();
        }
        else if (((clearText != null && clearText instanceof Array) || clearText === null) && ((clearOff != null && clearOff instanceof Array) || clearOff === null) && cipherText === undefined && cipherOff === undefined) {
            return this.encrypt$byte_A$byte_A(clearText, clearOff);
        }
        else if (((clearText != null && clearText instanceof Array) || clearText === null) && clearOff === undefined && cipherText === undefined && cipherOff === undefined) {
            return this.encrypt$byte_A(clearText);
        }
        else
            throw new Error('invalid overload');
    };
    DES.prototype.decrypt = function (cipherText, cipherOff, clearText, clearOff) {
        var _this = this;
        if (((cipherText != null && cipherText instanceof Object) || cipherText === null) && ((typeof cipherOff === 'number') || cipherOff === null) && ((clearText != null && clearText instanceof Object) || clearText === null) && ((typeof clearOff === 'number') || clearOff === null)) {
            return (function () {
                DES.squashBytesToInts(cipherText, cipherOff, _this.tempInts, 0, 2);
                _this.des(_this.tempInts, _this.tempInts, _this.decryptKeys);
                DES.spreadIntsToBytes(_this.tempInts, 0, clearText, clearOff, 2);
            })();
        }
        else if (((cipherText != null && cipherText instanceof Object) || cipherText === null) && ((cipherOff != null && cipherOff instanceof Object) || cipherOff === null) && clearText === undefined && clearOff === undefined) {
            return this.decrypt$byte_A$byte_A(cipherText, cipherOff);
        }
        else if (((cipherText != null && cipherText instanceof Object) || cipherText === null) && cipherOff === undefined && clearText === undefined && clearOff === undefined) {
            return this.decrypt$byte_A(cipherText);
        }
        else
            throw new Error('invalid overload');
    };
    DES.prototype.des = function (inInts, outInts, keys) {
        var fval;
        var work;
        var right;
        var leftt;
        var round;
        var keysi = 0;
        leftt = inInts[0];
        right = inInts[1];
        work = ((leftt >>> 4) ^ right) & 252645135;
        right ^= work;
        leftt ^= (work << 4);
        work = ((leftt >>> 16) ^ right) & 65535;
        right ^= work;
        leftt ^= (work << 16);
        work = ((right >>> 2) ^ leftt) & 858993459;
        leftt ^= work;
        right ^= (work << 2);
        work = ((right >>> 8) ^ leftt) & 16711935;
        leftt ^= work;
        right ^= (work << 8);
        right = (right << 1) | ((right >>> 31) & 1);
        work = (leftt ^ right) & -1431655766;
        leftt ^= work;
        right ^= work;
        leftt = (leftt << 1) | ((leftt >>> 31) & 1);
        for (round = 0; round < 8; ++round) {
            work = (right << 28) | (right >>> 4);
            work ^= keys[keysi++];
            fval = DES.SP7_$LI$()[work & 63];
            fval |= DES.SP5_$LI$()[(work >>> 8) & 63];
            fval |= DES.SP3_$LI$()[(work >>> 16) & 63];
            fval |= DES.SP1_$LI$()[(work >>> 24) & 63];
            work = right ^ keys[keysi++];
            fval |= DES.SP8_$LI$()[work & 63];
            fval |= DES.SP6_$LI$()[(work >>> 8) & 63];
            fval |= DES.SP4_$LI$()[(work >>> 16) & 63];
            fval |= DES.SP2_$LI$()[(work >>> 24) & 63];
            leftt ^= fval;
            work = (leftt << 28) | (leftt >>> 4);
            work ^= keys[keysi++];
            fval = DES.SP7_$LI$()[work & 63];
            fval |= DES.SP5_$LI$()[(work >>> 8) & 63];
            fval |= DES.SP3_$LI$()[(work >>> 16) & 63];
            fval |= DES.SP1_$LI$()[(work >>> 24) & 63];
            work = leftt ^ keys[keysi++];
            fval |= DES.SP8_$LI$()[work & 63];
            fval |= DES.SP6_$LI$()[(work >>> 8) & 63];
            fval |= DES.SP4_$LI$()[(work >>> 16) & 63];
            fval |= DES.SP2_$LI$()[(work >>> 24) & 63];
            right ^= fval;
        }
        right = (right << 31) | (right >>> 1);
        work = (leftt ^ right) & -1431655766;
        leftt ^= work;
        right ^= work;
        leftt = (leftt << 31) | (leftt >>> 1);
        work = ((leftt >>> 8) ^ right) & 16711935;
        right ^= work;
        leftt ^= (work << 8);
        work = ((leftt >>> 2) ^ right) & 858993459;
        right ^= work;
        leftt ^= (work << 2);
        work = ((right >>> 16) ^ leftt) & 65535;
        leftt ^= work;
        right ^= (work << 16);
        work = ((right >>> 4) ^ leftt) & 252645135;
        leftt ^= work;
        right ^= (work << 4);
        outInts[0] = right;
        outInts[1] = leftt;
    };
    DES.prototype.encrypt$byte_A$byte_A = function (clearText, cipherText) {
        this.encrypt(clearText, 0, cipherText, 0);
    };
    DES.prototype.decrypt$byte_A$byte_A = function (cipherText, clearText) {
        this.decrypt(cipherText, 0, clearText, 0);
    };
    /**
     * encrypts an array where the length must be a multiple of 8
     */
    DES.prototype.encrypt$byte_A = function (clearText) {
        var length = clearText.length;
        if (length % 8 !== 0) {
            console.info("Array must be a multiple of 8");
            return null;
        }
        var cipherText = new Array(length);
        var count = (length / 8 | 0);
        for (var i = 0; i < count; i++)
            this.encrypt(clearText, i * 8, cipherText, i * 8);
        return cipherText;
    };
    /**
     * decrypts an array where the length must be a multiple of 8
     */
    DES.prototype.decrypt$byte_A = function (cipherText) {
        var length = cipherText.length;
        if (length % 8 !== 0) {
            console.info("Array must be a multiple of 8");
            return null;
        }
        var clearText = new Array(length);
        var count = (length / 8 | 0);
        for (var i = 0; i < count; i++)
            this.encrypt(cipherText, i * 8, clearText, i * 8);
        return clearText;
    };
    DES.bytebit_$LI$ = function () {
        if (DES.bytebit == null)
            DES.bytebit = [(128 | 0), (64 | 0), (32 | 0), (16 | 0), (8 | 0), (4 | 0), (2 | 0), (1 | 0)]; return DES.bytebit;
    };
    ;
    DES.bigbyte_$LI$ = function () {
        if (DES.bigbyte == null)
            DES.bigbyte = [8388608, 4194304, 2097152, 1048576, 524288, 262144, 131072, 65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]; return DES.bigbyte;
    };
    ;
    DES.pc1_$LI$ = function () {
        if (DES.pc1 == null)
            DES.pc1 = [(56 | 0), (48 | 0), (40 | 0), (32 | 0), (24 | 0), (16 | 0), (8 | 0), (0 | 0), (57 | 0), (49 | 0), (41 | 0), (33 | 0), (25 | 0), (17 | 0), (9 | 0), (1 | 0), (58 | 0), (50 | 0), (42 | 0), (34 | 0), (26 | 0), (18 | 0), (10 | 0), (2 | 0), (59 | 0), (51 | 0), (43 | 0), (35 | 0), (62 | 0), (54 | 0), (46 | 0), (38 | 0), (30 | 0), (22 | 0), (14 | 0), (6 | 0), (61 | 0), (53 | 0), (45 | 0), (37 | 0), (29 | 0), (21 | 0), (13 | 0), (5 | 0), (60 | 0), (52 | 0), (44 | 0), (36 | 0), (28 | 0), (20 | 0), (12 | 0), (4 | 0), (27 | 0), (19 | 0), (11 | 0), (3 | 0)]; return DES.pc1;
    };
    ;
    DES.totrot_$LI$ = function () {
        if (DES.totrot == null)
            DES.totrot = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28]; return DES.totrot;
    };
    ;
    DES.pc2_$LI$ = function () {
        if (DES.pc2 == null)
            DES.pc2 = [(13 | 0), (16 | 0), (10 | 0), (23 | 0), (0 | 0), (4 | 0), (2 | 0), (27 | 0), (14 | 0), (5 | 0), (20 | 0), (9 | 0), (22 | 0), (18 | 0), (11 | 0), (3 | 0), (25 | 0), (7 | 0), (15 | 0), (6 | 0), (26 | 0), (19 | 0), (12 | 0), (1 | 0), (40 | 0), (51 | 0), (30 | 0), (36 | 0), (46 | 0), (54 | 0), (29 | 0), (39 | 0), (50 | 0), (44 | 0), (32 | 0), (47 | 0), (43 | 0), (48 | 0), (38 | 0), (55 | 0), (33 | 0), (52 | 0), (45 | 0), (41 | 0), (49 | 0), (35 | 0), (28 | 0), (31 | 0)]; return DES.pc2;
    };
    ;
    DES.SP1_$LI$ = function () {
        if (DES.SP1 == null)
            DES.SP1 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756]; return DES.SP1;
    };
    ;
    DES.SP2_$LI$ = function () {
        if (DES.SP2 == null)
            DES.SP2 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344]; return DES.SP2;
    };
    ;
    DES.SP3_$LI$ = function () {
        if (DES.SP3 == null)
            DES.SP3 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584]; return DES.SP3;
    };
    ;
    DES.SP4_$LI$ = function () {
        if (DES.SP4 == null)
            DES.SP4 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928]; return DES.SP4;
    };
    ;
    DES.SP5_$LI$ = function () {
        if (DES.SP5 == null)
            DES.SP5 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080]; return DES.SP5;
    };
    ;
    DES.SP6_$LI$ = function () {
        if (DES.SP6 == null)
            DES.SP6 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312]; return DES.SP6;
    };
    ;
    DES.SP7_$LI$ = function () {
        if (DES.SP7 == null)
            DES.SP7 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154]; return DES.SP7;
    };
    ;
    DES.SP8_$LI$ = function () {
        if (DES.SP8 == null)
            DES.SP8 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696]; return DES.SP8;
    };
    ;
    DES.squashBytesToInts = function (inBytes, inOff, outInts, outOff, intLen) {
        for (var i = 0; i < intLen; ++i)
            outInts[outOff + i] = ((inBytes[inOff + i * 4] & 255) << 24) | ((inBytes[inOff + i * 4 + 1] & 255) << 16) | ((inBytes[inOff + i * 4 + 2] & 255) << 8) | (inBytes[inOff + i * 4 + 3] & 255);
    };
    DES.spreadIntsToBytes = function (inInts, inOff, outBytes, outOff, intLen) {
        for (var i = 0; i < intLen; ++i) {
            outBytes[outOff + i * 4] = ((inInts[inOff + i] >>> 24) | 0);
            outBytes[outOff + i * 4 + 1] = ((inInts[inOff + i] >>> 16) | 0);
            outBytes[outOff + i * 4 + 2] = ((inInts[inOff + i] >>> 8) | 0);
            outBytes[outOff + i * 4 + 3] = (inInts[inOff + i] | 0);
        }
    };
    return DES;
}());
DES.SP8_$LI$();
DES.SP7_$LI$();
DES.SP6_$LI$();
DES.SP5_$LI$();
DES.SP4_$LI$();
DES.SP3_$LI$();
DES.SP2_$LI$();
DES.SP1_$LI$();
DES.pc2_$LI$();
DES.totrot_$LI$();
DES.pc1_$LI$();
DES.bigbyte_$LI$();
DES.bytebit_$LI$();
