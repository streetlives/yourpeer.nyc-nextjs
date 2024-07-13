// Copyright (c) 2024 Streetlives, Inc.
//
// Use of this source code is governed by an MIT-style
// license that can be found in the LICENSE file or at
// https://opensource.org/licenses/MIT.

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  const text = await request.text();
  try {
    const msg = {
      from: "jake@minnow.io",
      to: ["jake@minnow.io"], //['ypissuereport@streetlives.nyc'],
      subject: "New Issue Report",
      text,
    };
    const data = await sgMail.send(msg);
    return Response.json(data);
  } catch (e) {
    return Response.json(e, { status: 500 });
  }
}
