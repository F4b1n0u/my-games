import 'rxjs'
import _ from 'lodash'
import { ajax } from 'rxjs/observable/dom/ajax'
import qs from 'query-string'
import X2JS from 'x2js'
import base64 from 'base-64'
import crypto from 'crypto-js'
import moment from 'moment'

import {
  AWS_MARKETPLACE,
  AWS_ASSOCIATE_TAG,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from 'react-native-dotenv'

export const fetchGameName = (barcode) => {
  // const awsSignature = new AWSSignature();
  const now = moment()
  
  let credentials = {
    SecretKey: AWS_SECRET_ACCESS_KEY,
    AccessKeyId: AWS_ACCESS_KEY_ID
  }

  const endpoint = 'webservices.amazon.co.uk'
  const uri = '/onca/xml'
  const params = {
    AssociateTag: 'fbdevmygames-21',
    AWSAccessKeyId: 'AKIAJ3IDBVUW6HZZFHWQ',
    Keywords: barcode,
    Operation: 'ItemSearch',
    ResponseGroup: 'ItemAttributes',
    SearchIndex: 'VideoGames',
    Service: 'AWSECommerceService',
    Timestamp: now.format('YYYY-MM-DD[T]HH:mm:ss[Z]')
  }

  const canonicalQueryString = qs.stringify(params)
  const stringSoSign = `GET\n${endpoint}\n${uri}\n${canonicalQueryString}`
  
  const hash = crypto.HmacSHA256(stringSoSign, AWS_SECRET_ACCESS_KEY)
  const signature = hash.toString(crypto.enc.Base64)
  
  const signedUrl = `http://${endpoint}${uri}?${canonicalQueryString}&Signature=${encodeURIComponent(signature)}`

  const setting = {
    method: 'GET',
    url: signedUrl,
    responseType: 'text',
  }

  return ajax(setting)
    .map((response) => {
      const xmlResponse = response.response
      const jsonResponse = new X2JS().xml2js(xmlResponse)
      const gameName = _.get(jsonResponse, 'ItemSearchResponse.Items.Item.ItemAttributes.Title', '')

      return gameName
    })
}

//  VERY USEFULL TO DEBUG THE ENCRYPTION

// // Your Access Key ID, as taken from the Your Account page
// $access_key_id = "AKIAJ3IDBVUW6HZZFHWQ";

// // Your Secret Key corresponding to the above ID, as taken from the Your Account page
// $secret_key = "3yRl/xttgT7QoDoAJyE2WpIJ0nfjK5NI+OJO3a37";

// // The region you are interested in
// $endpoint = "webservices.amazon.co.uk";

// $uri = "/onca/xml";

// $params = array(
//     "Service" => "AWSECommerceService",
//     "Operation" => "ItemSearch",
//     "AWSAccessKeyId" => "AKIAJ3IDBVUW6HZZFHWQ",
//     "AssociateTag" => "fbdevmygames-21",
//     "SearchIndex" => "VideoGames",
//     "ResponseGroup" => "ItemAttributes",
//     "Keywords" => "0454968700104"
// );

// // Set current timestamp if not set
// if (!isset($params["Timestamp"])) {
//     $params["Timestamp"] = "2017-09-21T18:29:41Z";
// }

// // Sort the parameters by key
// ksort($params);

// $pairs = array();

// foreach ($params as $key => $value) {
//     array_push($pairs, rawurlencode($key)."=".rawurlencode($value));
// }

// // Generate the canonical query
// $canonical_query_string = join("&", $pairs);

// // Generate the string to be signed
// $string_to_sign = "GET\n".$endpoint."\n".$uri."\n".$canonical_query_string;

// // Generate the signature required by the Product Advertising API
// $hash = hash_hmac("sha256", $string_to_sign, $secret_key, true);

// $signature = base64_encode($hash);

// // Generate the signed URL
// $request_url = 'http://'.$endpoint.$uri.'?'.$canonical_query_string.'&Signature='.rawurlencode($signature);

// echo "signature: \"".$signature."\"";
// echo "request_url: \"".$request_url."\"";