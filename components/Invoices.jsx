import React from "react";

const Invoices = () => {
  return (
    <div className="container">
      <div className="tm_invoice_wrap">
        <div className="tm_invoice tm_style1 tm_type1" id="tm_download_section">
          <div className="tm_invoice_in">
            <div className="tm_invoice_head tm_top_head tm_mb15 tm_align_center">
              <div className="tm_invoice_left">
                <div className="tm_logo">
                  <img src="/images/logo.png" alt="Logo" />
                </div>
              </div>
              <div className="tm_invoice_right tm_text_right tm_mobile_hide">
                <div className="tm_f50 tm_text_uppercase tm_white_color">
                  Invoice
                </div>
              </div>
              <div className="tm_shape_bg tm_accent_bg tm_mobile_hide"></div>
            </div>
            <div className="tm_invoice_info tm_mb25">
              <div className="tm_card_note tm_mobile_hide">
                <b className="tm_primary_color">Payment Method: </b>Paypal, Western
                Union
              </div>
              <div className="tm_invoice_info_list tm_white_color">
                <p className="tm_invoice_number tm_m0">
                  Invoice No: <b>#LL93784</b>
                </p>
                <p className="tm_invoice_date tm_m0">
                  Date: <b>01.07.2022</b>
                </p>
              </div>
              <div className="tm_invoice_seperator tm_accent_bg"></div>
            </div>
            <div className="tm_invoice_head tm_mb10">
              <div className="tm_invoice_left">
                <p className="tm_mb2">
                  <b className="tm_primary_color">Invoice To:</b>
                </p>
                <p>
                  Lowell H. Dominguez <br />
                  84 Spilman Street, London <br />
                  United Kingdom <br />
                  lowell@gmail.com
                </p>
              </div>
              <div className="tm_invoice_right tm_text_right">
                <p className="tm_mb2">
                  <b className="tm_primary_color">Pay To:</b>
                </p>
                <p>
                  Laralink Ltd <br />
                  86-90 Paul Street, London
                  <br />
                  England EC2A 4NE <br />
                  demo@gmail.com
                </p>
              </div>
            </div>
            <div className="tm_table tm_style1" style={{marginTop:30}}>
              <div className="">
                <div className="tm_table_responsive">
                  <table>
                    <thead>
                      <tr className="tm_accent_bg">
                        <th className="tm_width_3 tm_semi_bold tm_white_color">
                          Item
                        </th>
                        <th className="tm_width_4 tm_semi_bold tm_white_color">
                          Description
                        </th>
                        <th className="tm_width_2 tm_semi_bold tm_white_color">
                          Price
                        </th>
                        <th className="tm_width_1 tm_semi_bold tm_white_color">
                          Qty
                        </th>
                        <th className="tm_width_2 tm_semi_bold tm_white_color tm_text_right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tm_width_3">1. Website Design</td>
                        <td className="tm_width_4">
                          Six web page designs and three times revision
                        </td>
                        <td className="tm_width_2">$350</td>
                        <td className="tm_width_1">1</td>
                        <td className="tm_width_2 tm_text_right">$350</td>
                      </tr>
                      <tr>
                        <td className="tm_width_3">2. Web Development</td>
                        <td className="tm_width_4">
                          Convert pixel-perfect frontend and make it dynamic
                        </td>
                        <td className="tm_width_2">$600</td>
                        <td className="tm_width_1">1</td>
                        <td className="tm_width_2 tm_text_right">$600</td>
                      </tr>
                      <tr>
                        <td className="tm_width_3">3. App Development</td>
                        <td className="tm_width_4">
                          Android & Ios Application Development
                        </td>
                        <td className="tm_width_2">$200</td>
                        <td className="tm_width_1">2</td>
                        <td className="tm_width_2 tm_text_right">$400</td>
                      </tr>
                      <tr>
                        <td className="tm_width_3">4. Digital Marketing</td>
                        <td className="tm_width_4">
                          Facebook, Youtube and Google Marketing
                        </td>
                        <td className="tm_width_2">$100</td>
                        <td className="tm_width_1">3</td>
                        <td className="tm_width_2 tm_text_right">$300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tm_invoice_footer tm_border_top tm_mb15 tm_m0_md">
                <div className="tm_left_footer">
                  <p className="tm_mb2">
                    <b className="tm_primary_color">Payment info:</b>
                  </p>
                  <p className="tm_m0">
                    Credit Card - 236***********928 <br />
                    Amount: $1732
                  </p>
                </div>
                <div className="tm_right_footer">
                  <table className="tm_mb15">
                    <tbody>
                      <tr className="tm_gray_bg ">
                        <td className="tm_width_3 tm_primary_color tm_bold">
                          Subtoal
                        </td>
                        <td className="tm_width_3 tm_primary_color tm_bold tm_text_right">
                          $1650
                        </td>
                      </tr>
                      <tr className="tm_gray_bg">
                        <td className="tm_width_3 tm_primary_color">
                          Tax <span className="tm_ternary_color">(5%)</span>
                        </td>
                        <td className="tm_width_3 tm_primary_color tm_text_right">
                          +$82
                        </td>
                      </tr>
                      <tr className="tm_accent_bg">
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color">
                          Grand Total{" "}
                        </td>
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right">
                          $1732
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tm_invoice_footer tm_type1">
                <div className="tm_left_footer"></div>
                <div className="tm_right_footer">
                  <div className="tm_sign tm_text_center">
                    {/* <img src="assets/img/sign.svg" alt="Sign" />
                    <p className="tm_m0 tm_ternary_color">Jhon Donate</p>
                    <p className="tm_m0 tm_f16 tm_primary_color">
                      Accounts Manager
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="tm_note tm_text_center tm_font_style_normal">
              <hr className="tm_mb15" />
              <p className="tm_mb2">
                <b className="tm_primary_color">Terms & Conditions:</b>
              </p>
              <p className="tm_m0">
                All claims relating to quantity or shipping errors shall be
                waived by Buyer unless made in writing to <br />
                Seller within thirty (30) days after delivery of goods to the
                address stated.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Invoices;
