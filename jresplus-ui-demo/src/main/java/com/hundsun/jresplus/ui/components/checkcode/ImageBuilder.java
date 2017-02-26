package com.hundsun.jresplus.ui.components.checkcode;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

import javax.imageio.ImageIO;

public class ImageBuilder {
	private static Random random = new Random();

	public static final void buildImage(OutputStream outputStream, int width,
			int height, String string) throws IOException {
		BufferedImage image = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);

		Graphics g = image.getGraphics();

		g.setColor(Color.LIGHT_GRAY);
		g.fillRect(0, 0, width, height);

		g.setColor(Color.BLACK);
		for (int i = 0; i < 18; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(width / 4);
			int yl = random.nextInt(height / 4);
			g.drawLine(x, y, x + xl, y + yl);
		}

		g.setFont(new Font("Times   New   Roman", Font.PLAIN, 24));

		int jumpHight = -2;
		for (int i = 0; i < string.length(); i++) {
			String ch = string.substring(i, i + 1);

			g.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110)));
			if (jumpHight == -2) {
				jumpHight = 2;
			} else {
				jumpHight = -2;
			}
			g.drawString(ch, 16 * i + 10 + random.nextInt(4), 24 + jumpHight
					+ random.nextInt(4));
		}

		g.dispose();

		ImageIO.write(image, "JPEG", outputStream);
	}
}