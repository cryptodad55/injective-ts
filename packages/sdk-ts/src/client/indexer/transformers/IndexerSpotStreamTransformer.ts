import { StreamOperation } from '../../../types'
import { IndexerGrpcSpotTransformer } from './IndexerGrpcSpotTransformer'
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts'

/**
 * @category Indexer Stream Transformer
 */
export class IndexerSpotStreamTransformer {
  static orderbookStreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamOrderbookResponse,
  ) => {
    const orderbook = response.orderbook

    return {
      orderbook: orderbook
        ? IndexerGrpcSpotTransformer.grpcOrderbookToOrderbook({
            buys: orderbook.buys,
            sells: orderbook.sells,
          })
        : undefined,
      operation: response.operationType as StreamOperation,
      marketId: response.marketId,
      timestamp: response.timestamp,
    }
  }

  static tradesStreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamTradesResponse,
  ) => {
    const trade = response.trade

    return {
      trade: trade
        ? IndexerGrpcSpotTransformer.grpcTradeToTrade(trade)
        : undefined,
      operation: response.operationType as StreamOperation,
      timestamp: response.timestamp,
    }
  }

  static ordersStreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamOrdersResponse,
  ) => {
    const order = response.order

    return {
      order: order
        ? IndexerGrpcSpotTransformer.grpcOrderToOrder(order)
        : undefined,
      operation: response.operationType as StreamOperation,
      timestamp: response.timestamp,
    }
  }

  static orderHistoryStreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamOrdersHistoryResponse,
  ) => {
    const order = response.order

    return {
      order: order
        ? IndexerGrpcSpotTransformer.grpcOrderHistoryToOrderHistory(order)
        : undefined,
      operation: response.operationType as StreamOperation,
      timestamp: response.timestamp,
    }
  }

  static orderbookV2StreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamOrderbookV2Response,
  ) => {
    const orderbook = response.orderbook

    return {
      orderbook: orderbook
        ? IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
            sequence: parseInt(orderbook.sequence, 10),
            buys: orderbook.buys,
            sells: orderbook.sells,
          })
        : undefined,
      operation: response.operationType as StreamOperation,
      marketId: response.marketId,
      timestamp: response.timestamp,
    }
  }

  static orderbookUpdateStreamCallback = (
    response: InjectiveSpotExchangeRpc.StreamOrderbookUpdateResponse,
  ) => {
    const orderbook = response.orderbookLevelUpdates

    return {
      orderbook: orderbook
        ? IndexerGrpcSpotTransformer.grpcOrderbookV2ToOrderbookV2({
            sequence: parseInt(orderbook.sequence, 10),
            buys: orderbook.buys,
            sells: orderbook.sells,
          })
        : undefined,
      operation: response.operationType as StreamOperation,
      marketId: response.marketId,
      timestamp: response.timestamp,
    }
  }
}
